const FilterColor = (data, color) => {
  const filterColor = [];
  data &&
    data.forEach(icon => {
      const iconObj = {};
      icon.variants.forEach(variant => {
        if (variant.color === color) {
          iconObj.image = variant.image;
          iconObj.name = variant.filename;
          filterColor.push(iconObj);
        }
      });
    });
  return filterColor;
};

export default FilterColor;
