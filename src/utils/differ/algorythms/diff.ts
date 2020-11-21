export enum EActions {
  EQUAL = "equal",
  INSERT = "insert",
  DELETE = "delete",
}

export const diff = (a: string, b: string): EActions[] => {
  const aLength = a.length;
  const bLength = b.length;

  // Temporary action type statics.
  let _insert: EActions;
  let _delete: EActions;

  // Swapped the arrays to use the shorter one as the first one.
  if ( bLength < aLength ) {
    const tmp = a;

    a = b;
    b = tmp;

    // We swap the action types as well.
    _insert = EActions.DELETE;
    _delete = EActions.INSERT;
  } else {
    _insert = EActions.INSERT;
    _delete = EActions.DELETE;
  }

  const m = a.length;
  const n = b.length;

  const delta = n - m;
  const offset = m + 1;
  const size = m + n + 3;

  // Edit scripts, for each diagonal.
  const es = new Array(size);
  // Furthest points, the furthest y we can get on each diagonal.
  const fp = new Array(size);

  function snake(k: number) {
    // We use -1 as an alternative below to handle initial values ( instead of filling the fp with -1 first ).
    // Furthest points (y) on the diagonal below k.
    const y1 = (fp[k - 1 + offset] !== undefined ? fp[k - 1 + offset] : -1 ) + 1;
    // Furthest points (y) on the diagonal above k.
    const y2 = fp[k + 1 + offset] !== undefined ? fp[k + 1 + offset] : -1;
    // The way we should go to get further.
    const dir = y1 > y2 ? -1 : 1;

    // Clone previous changes array (if any).
    if (es[k + dir + offset]) {
      es[k + offset] = es[k + dir + offset].slice(0);
    }

    // Create changes array.
    if (!es[k + offset]) {
      es[k + offset] = [];
    }

    // Push the action.
    es[k + offset].push(y1 > y2 ? _insert : _delete);

    // Set the beginning coordinates.
    let y = Math.max(y1, y2);
    let x = y - k;

    // Traverse the diagonal as long as the values match.
    while (x < m && y < n && a[x] == b[y]) {
      x++;
      y++;
      // Push no change action.
      es[k + offset].push(EActions.EQUAL);
    }

    return y;
  }

  let p = -1;

  // Traverse the graph until we reach the end of the longer string.
  do {
    ++p
    // Updates furthest points and edit scripts for diagonals below delta.
    for (let k = -p; k <= delta - 1; ++k) {
      fp[k + offset] = snake( k );
    }

    // Updates furthest points and edit scripts for diagonals above delta.
    for (let k = delta + p; k >= delta +1; --k ) {
      fp[k + offset] = snake(k);
    }

    // Updates furthest point and edit script for the delta diagonal.
    // note that the delta diagonal is the one which goes through the sink (m, n).
    fp[delta + offset] = snake(delta);
  } while ( fp[delta + offset] !== n );

  // Return the final list of edit changes.
  // We remove the first item that represents the action for the injected nulls.
  return es[delta + offset].slice(1);
};
