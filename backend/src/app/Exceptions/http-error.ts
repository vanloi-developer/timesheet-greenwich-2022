class HttpError extends Error {
    constructor(public status: number, message: string) {
      super();
    }
  }
  
  Object.seal(HttpError)
  export = HttpError