export const returnTagsAsArray = (tags) => {
  if (!tags) {
    return "";
  }
  return tags.split(",") || [];
};

export const getTagNameByid = (tags, tagId) =>
  tags.find((tag) => tag.id === Number(tagId))?.text || "";
