import { Tenant } from "./../../authentication/entities/tenant";

export class CreateProblemDto {
//     @Type(() => NationalDto)
//   @Expose()
  tenant: Tenant


    constructor(public subject: string, public description: string, public imageUrl?: string) {}
}
