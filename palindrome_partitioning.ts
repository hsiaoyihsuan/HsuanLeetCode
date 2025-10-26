// 131. Palindrome Partitioning
// Backtracking
// Time: O(n x 2^n), Space: O(n)
function partition(s: string): string[][] {
  const result: string[][] = [];
  let cur: string[] = [];

  function isPalindrom(str: string) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  function dfs(i: number, str: string) {
    if (i >= s.length) {
      if (str === "") {
        result.push([...cur]);
      }
      return;
    }

    if (isPalindrom(str + s[i])) {
      cur.push(str + s[i]);
      dfs(i + 1, "");
      cur.pop();
    }

    dfs(i + 1, str + s[i]);
  }

  dfs(0, "");
  return result;
}

// Refined backtracking
function partition2(s: string): string[][] {
  const result: string[][] = [];
  let cur: string[] = [];

  function isPalindrom(str: string, i: number, j: number) {
    let left = i;
    let right = j;
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  function dfs(i: number) {
    if (i >= s.length) {
      result.push([...cur]);
      return;
    }

    for (let j = i; j < s.length; j++) {
      if (isPalindrom(s, i, j)) {
        cur.push(s.slice(i, j + 1));
        dfs(j + 1);
        cur.pop();
      }
    }
  }

  dfs(0);
  return result;
}
