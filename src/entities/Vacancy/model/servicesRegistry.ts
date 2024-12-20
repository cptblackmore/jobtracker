import { hhStyles, superjobStyles, trudvsemStyles } from "../ui/servicesStyles";
import { adapterHH } from "./adapters/adapterHH";
import { adapterSuperjob } from "./adapters/adapterSuperjob";
import { adapterTrudvsem } from "./adapters/adapterTrudvsem";

export const servicesRegistry = {
  superjob: {
    adapter: adapterSuperjob,
    styles: superjobStyles
  },
  hh: {
    adapter: adapterHH,
    styles: hhStyles
  },
  trudvsem: {
    adapter: adapterTrudvsem,
    styles: trudvsemStyles
  }
}
