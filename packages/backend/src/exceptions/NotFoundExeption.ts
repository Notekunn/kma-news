import HttpException from './HttpException'

export default class NotFoundExeption extends HttpException {
  constructor(entityName: string) {
    super(404, `${entityName} not found`)
  }
}
