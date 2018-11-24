import { Tag } from "./Tag";

export interface ToDo {
    id:number;
    name: string;
    description:string;
    complete: boolean;
    user_id:number;
    tags:Tag[];
}
  
  