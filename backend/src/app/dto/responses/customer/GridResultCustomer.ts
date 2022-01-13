import { CustomerDto } from "../../common/CustomerDto";

import { GridResult } from "../../common/GridResult";

export interface GridResultCustomer extends GridResult {
  items: [CustomerDto];
}
