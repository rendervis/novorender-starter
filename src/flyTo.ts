import { View } from "@novorender/webgl-api";

export function initFlyTo(view: View): void {
  let cameraPositions = JSON.parse(
    localStorage.getItem("cameraPositions") || "[]"
  );

  let idx = -1;
  const flyToButton = document.getElementById(
    "fly_to_button"
  )! as HTMLButtonElement;
  flyToButton.disabled = cameraPositions.length === 0;

  // Toggle UI
  flyToButton.addEventListener("click", () => {
    if (cameraPositions.length === 0) {
      return;
    }

    idx = (idx + 1) % cameraPositions.length;

    const { position, rotation } = cameraPositions[idx];
    view.camera.controller.moveTo(position, rotation);
  });
}
