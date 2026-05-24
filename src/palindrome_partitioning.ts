// 131. Palindrome Partitioning
// Method: DFS Backtracking
//
// Idea:
// - Build the current substring one character at a time
// - When the current substring is a palindrome, choose it as the next partition
// - Also explore the branch that keeps extending the current substring
// - Save the path only when all characters are used and no substring is left open
//
// Time: O(n^2 x 2^n)
// - there are O(2^n) ways to cut between characters
// - each palindrome check can cost O(n)
// - copying a valid partition can cost O(n)
//
// Space: O(n x 2^n)
// - output can store O(2^n) partitions with up to n strings each
// - current path and recursion stack cost O(n)
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

// Method: DFS Backtracking
//
// Idea:
// - Treat i as the start index of the next substring
// - Try every end index j from i to the end of the string
// - Recurse only when s[i..j] is a palindrome
// - Backtrack by removing the chosen substring before trying the next end index
//
// Time: O(n^2 x 2^n)
// - there are O(2^n) possible partitions
// - each palindrome check can cost O(n)
// - copying a valid partition can cost O(n)
//
// Space: O(n x 2^n)
// - output can store O(2^n) partitions with up to n strings each
// - current path and recursion stack cost O(n)
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
