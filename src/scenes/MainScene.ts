import type { SiteSectionDesc } from "@/lib/SiteSectionDesc";
import { parseHex } from "@/utils/colors";
import { getBodyScrollAmount } from "@/utils/scroll";
import {
  AppendSceneAsync,
  Camera,
  FreeCamera,
  HemisphericLight,
  TransformNode,
  Vector3,
  type Engine,
} from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";





export default class MainScene extends Scene {
  camera: FreeCamera;
  scrollAmount = 0;

  constructor(engine: Engine) {
    super(engine);

    this.camera = new FreeCamera("camera1", new Vector3(-5, 10, 10), this);
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(true);

    registerBuiltInLoaders();
    this.setup().then(() => {
      this.createScene();
    });
  }

  async setup() {
    const { Inspector } = await import("@babylonjs/inspector");
    // Listen for ESC key to toggle Babylon.js Inspector
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if ((window as any).BABYLON && Inspector.IsVisible) {
          Inspector.Hide();
        } else {
          Inspector.Show(this, {});
          Inspector.PopupSceneExplorer();
          Inspector.PopupInspector();
        }
      }
    });
    document.body.addEventListener('scrollsnapchange', (event) => {
      const snapTargetBlock = (event as any).snapTargetBlock;
      if (snapTargetBlock != event.target){
        this.startSection(snapTargetBlock)
      }
    });

    const onScroll = () => {
      this.scrollAmount = getBodyScrollAmount();
    };
    document.body.addEventListener("scroll", onScroll);
    this.clearColor = parseHex("#15191e");
  }

  private async createScene() {
    this.getEngine().hideLoadingUI();
    // Load the scene.glb file
    await AppendSceneAsync("/3d/scene.glb", this);
    const startCam = this.getNodeByName("CameraContainer") as TransformNode;
    this.camera.position.copyFrom(startCam.position);
    this.camera.setTarget(Vector3.Zero());

    this.onBeforeRenderObservable.add(() => {
      this.camera.position.x =
        startCam.position.x + (1 - this.scrollAmount) * 100;
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    this.generateSections();
  }

  sections: SiteSectionDesc[] = [];

  private generateSections() {
    this.getNodes()
      .filter((node) => node.name.indexOf("section.") != -1)
      .forEach((node) => {
        const nodeName = node.name.toLocaleLowerCase();
        const index = nodeName.split(".")?.[1];
        const el = document.querySelector(
          `[data-section='section-${index}']`
        );
        const camera = node.getDescendants(true, (child) => {
          return child.name.toLowerCase().indexOf("camera") != -1;
        })?.[0] as Camera | null;
        this.sections.push({
          el,
          index,
          node,
          camera,
          name: node?.metadata?.gltf?.extras?.name,
        });
      });

      // A little nasty code to allow the header to see the sections
      (window as any).siteSections = this.sections;
  }

  private startSection(el:HTMLElement ){
    const sectionLookup = this.sections.find((sectionDesc) => sectionDesc.el === el);
    if (sectionLookup){
      const {el, index, node, camera} = sectionLookup;
      // Do some animation
    }
  }
}
