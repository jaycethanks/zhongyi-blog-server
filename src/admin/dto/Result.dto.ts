export class Result extends Object {
  public static okData(data, message = '操作成功！') {
    const m = new Result();
    m['code'] = 0;
    m['data'] = data;
    m['success'] = true;
    m['message'] = message;
    return m;
  }
  public static error(message: string, code = 401) {
    const m = new Result();
    m['code'] = code;
    m['message'] = message;
    m['success'] = true;
    return m;
  }
}
