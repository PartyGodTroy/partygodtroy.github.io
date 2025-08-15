import { getWindowScrollAmount } from "@/utils/scroll";
import {
  AppendSceneAsync,
  ArcRotateCamera,
  Color3,
  Color4,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
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

    const onScroll = () => {
      this.scrollAmount = getWindowScrollAmount();
      console.log('scroll ended:',this.scrollAmount)
    };
    window.addEventListener("scrollend", onScroll);
  }

  private async createScene() {
    // Load the scene.glb file
    await AppendSceneAsync("/3d/scene.glb", this);
    const startCam = this.getNodeByName("CameraContainer") as TransformNode;
    this.camera.position.copyFrom(startCam.position);
    this.camera.setTarget(Vector3.Zero());

    this.onBeforeRenderObservable.add(() => {
      this.camera.position.x = startCam.position.x + this.scrollAmount * 1000;
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  }
}
