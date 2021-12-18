export const stringToSlug = (str: string) => {
  //Đổi chữ hoa thành chữ thường
  let slug = str.toLowerCase()

  //Đổi ký tự có dấu thành không dấu
  slug = slug
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
  //Xóa các ký tự đặc biệt
  slug = slug.replace(/\s/g, '-').replace(/[^\w-]+/g, '')
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/(\-)+/gi, '-')
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = slug.replace(/^\-|\-$/gi, '')
  return slug
}
