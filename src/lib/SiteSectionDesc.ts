import type { Camera, Node } from "@babylonjs/core";

import { create } from "zustand"
import { createStore } from "zustand/vanilla"



export interface SiteSectionDesc {
    el: Element | null;
    index: string;
    node: Node;
    name: string | null
  }

