// 739. Daily Temperatures
// Time: O(n), Space: O(n)
// Stack
function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array(temperatures.length).fill(0);
  const stack: {temp: number; index: number}[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    const t = temperatures[i];
    while (stack.length > 0 && stack.at(-1)!.temp < t) {
      const top = stack.pop()!;
      answer[top.index] = i - top.index;
    }
    stack.push({temp: t, index: i});
  }

  return answer;
}
