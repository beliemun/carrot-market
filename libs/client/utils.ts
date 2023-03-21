export const c = (...className: string[]) => className.join(" ");

export const getDeliveryUrl = (imageId: string, variantName: string) => {
  return `https://imagedelivery.net/${process.env.CF_HASH}/${imageId}/${variantName}`;
};
