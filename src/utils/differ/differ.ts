import memoize from "lodash.memoize";

import { diff, EActions } from "./algorythms/diff";
import { diffToChanges } from "./algorythms/diffToChanges";

const tagRegex = /(<([^>]+)>)/ig;
const htmlParseRegex = /(?:(<([^>]+)>)|([a-zA-Z0-9\x7f-\xff]+)|([\W]))/ig;

const isTag = (word: string) => word.match(tagRegex);

const startTag = "<span style=\"color: #000; background-color: #fff;\">";
const endTag = "</span>";
const insertTag = "<span style=\"color: #000; background-color: #aCF2BD;\">";
const deleteTag = "<span style=\"color: #000; background-color: #FBD8C0;\">";

export const differ = (input: string, output: string) => {
  try {
    const inputArray = input.match(htmlParseRegex) || [];
    let outputArray = output.match(htmlParseRegex) || [];

    if (inputArray.length > 0) {
      if (inputArray.length > 0 && !isTag(inputArray[0]) && !isTag(inputArray[inputArray.length - 1])) {
        inputArray.unshift(startTag);
        inputArray.unshift("<p>");
        inputArray.push(endTag);
        inputArray.push("</p>");
      }
    }

    if (outputArray.length > 0 && !isTag(outputArray[0]) && !isTag(outputArray[outputArray.length - 1])) {
      outputArray.unshift(startTag);
      outputArray.unshift("<p>");
      outputArray.push(endTag);
      outputArray.push("</p>");
    }

    // @ts-ignore
    const compareData = diffToChanges(diff(outputArray, inputArray), inputArray);

    let deleteOffset = 0;

    compareData.forEach((change) => {
      const { type, index, values, howMany } = change;
      const newIndex = deleteOffset + index;

      if (type === EActions.INSERT) {
        const newValues = [];

        for (let i = 0; i < values.length; i++) {
          let value = values[i];

          if (!isTag(values[i])) {
            if (i === 0 || isTag(values[i - 1])) {
              value = `${endTag}${insertTag}${value}`;
            }

            if (i === values.length - 1 || isTag(values[i + 1])) {
              value = `${value}${endTag}${startTag}`;
            }

            newValues.push(value);
          } else {
            newValues.push(value);
          }
        }

        outputArray = outputArray.slice(0, newIndex).concat(newValues, outputArray.slice(newIndex));
      } else if (type === EActions.DELETE) {
        deleteOffset += howMany;
        for (let i = newIndex; i < (newIndex + howMany); i++) {
          let value = outputArray[i];

          if (!isTag(outputArray[i])) {
            if (i === newIndex || isTag(outputArray[i - 1])) {
              value = `${endTag}${deleteTag}${value}`;
            }

            if (i === (newIndex + howMany - 1) || isTag(outputArray[i + 1])) {
              value = `${value}${endTag}${startTag}`;
            }

            if (i === (newIndex + howMany - 1) && outputArray[i] !== " ") {
              value = `${value}`;
            }

            outputArray[i] = value;
          }
        }
      }
    });

    return outputArray.join("");
  } catch (e) {
    return output;
  }
};

export const memoizedDiffer = memoize(differ);
