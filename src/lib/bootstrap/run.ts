import { View } from '@novorender/webgl-api'

//========= //  Run render loop // ========= //
export default async function run(view: View, canvas: HTMLCanvasElement): Promise<void> {
  // Handle canvas resizes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      canvas.width = entry.contentRect.width
      canvas.height = entry.contentRect.height
      view.applySettings({
        display: { width: canvas.width, height: canvas.height },
      })
    }
  })

  resizeObserver.observe(canvas)

  // Create a bitmap context to display render output
  const ctx = canvas.getContext('bitmaprenderer')

  // Main render loop
  while (true) {
    // Render frame
    const output = await view.render()
    {
      // Finalize output image
      const image = await output.getImage()

      if (image) {
        // Display in canvas
        ctx?.transferFromImageBitmap(image)
        image.close()
      }
    }
    ;(output as any).dispose()
  }
}
