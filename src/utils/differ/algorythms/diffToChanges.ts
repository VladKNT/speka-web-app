import { EActions } from "./diff";

export const diffToChanges = (diff: EActions[], output: string) => {
  let index = 0;
  let lastOperation: any;
  const changes: any[] = [];

  const pushLast = () => {
    if (lastOperation) {
      changes.push(lastOperation);
      lastOperation = null;
    }
  }

  const isContinuationOf = (expected: EActions) => {
    return lastOperation && lastOperation.type === expected;
  }

  diff.forEach((change) => {
    if (change === EActions.EQUAL) {
      pushLast();

      index += 1;
    } else if (change === EActions.INSERT) {
      if (isContinuationOf(EActions.INSERT)) {
        lastOperation.values.push(output[index]);
      } else {
        pushLast();

        lastOperation = {
          index,
          type: EActions.INSERT,
          values: [output[index]],
        };
      }

      index += 1;
    } else if (change === EActions.DELETE) {
      if (isContinuationOf(EActions.DELETE)) {
        lastOperation.howMany += 1;
      } else {
        pushLast();

        lastOperation = {
          index,
          howMany: 1,
          type: EActions.DELETE,
        };
      }
    }
  });

  pushLast();

  return changes;
};
