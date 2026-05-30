from pathlib import Path
import subprocess
import tempfile

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "assets" / "skill-icons-source"
OUTPUT_DIR = ROOT / "public" / "assets" / "skill-icons"
EDGE = Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe")


def render_svg_to_webp(svg_path: Path) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    webp_path = OUTPUT_DIR / f"{svg_path.stem}.webp"

    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        html_path = tmp_dir / f"{svg_path.stem}.html"
        png_path = tmp_dir / f"{svg_path.stem}.png"
        html_path.write_text(
            f"""<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body {{
        width: 128px;
        height: 128px;
        margin: 0;
        overflow: hidden;
        background: transparent;
      }}
      body {{
        display: grid;
        place-items: center;
      }}
      img {{
        width: 104px;
        height: 104px;
        object-fit: contain;
      }}
    </style>
  </head>
  <body>
    <img src="{svg_path.as_uri()}" />
  </body>
</html>
""",
            encoding="utf-8",
        )

        subprocess.run(
            [
                str(EDGE),
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--default-background-color=00000000",
                "--window-size=128,128",
                f"--screenshot={png_path}",
                html_path.as_uri(),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        image = Image.open(png_path).convert("RGBA")
        image.save(webp_path, "WEBP", quality=86, method=6)


def main() -> None:
    if not EDGE.exists():
        raise SystemExit(f"Microsoft Edge not found at {EDGE}")

    svg_files = sorted(SOURCE_DIR.glob("*.svg"))
    if not svg_files:
        raise SystemExit(f"No SVG files found in {SOURCE_DIR}")

    for svg_path in svg_files:
        render_svg_to_webp(svg_path)

    print(f"Converted {len(svg_files)} SVG icons to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
