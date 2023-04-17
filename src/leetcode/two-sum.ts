function twoSum(nums: number[], target: number): [number, number] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1, l = nums.length; j < l; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }

  return null;
}

function twoSum2(nums: number[], target: number): [number, number] {
  const map: Map<number, number> = new Map();

  for (let i = 0, l = nums.length; i < l; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }

    map.set(nums[i], i);
  }

  return null;
}

console.log("twoSum([3,2,4], 6)", twoSum2([3, 2, 4], 6));
