function twoSum(nums, target) {
  try {
    if (!Array.isArray(nums)) {
      throw new Error("Input should be an array");
    }

    if (typeof target !== "number") {
      throw new Error("Target should be a number");
    }

    if (nums.length < 2) {
      throw new Error("Array must contain at least two numbers");
    }

    const newObj = {};

    for (let i = 0; i < nums.length; i++) {
      const currentValue = nums[i];
      const difference = target - currentValue;

      if (newObj.hasOwnProperty(difference)) {
        return [newObj[difference], i];
      }

      newObj[currentValue] = i;
    }

    throw new Error("No valid pair found that sums to the target");
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

const array = [2, 7, 11, 15];
const target = 17;
console.log(twoSum(array, target));
