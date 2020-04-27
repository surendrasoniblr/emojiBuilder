export default {
  getEmojiList(state) {
    let outputArray = {};

    _.forEach(state.slackEmojiData, function (value) {
      if (!outputArray[value.category]) {
        outputArray[value.category] = [value];
      } else {
        outputArray[value.category].push(value)
      }
    });

    return outputArray;

  }
}
