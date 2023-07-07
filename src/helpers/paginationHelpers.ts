type IOptions = {
  page?: number;
  limit?: number;
};

type IPaginations = {
  page: number;
  limit: number;
  skip: number;
};

const calculationPagination = (options: IOptions): IPaginations => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const helpers = {
  calculationPagination,
};
