# Image to Data Uri

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/coderAllan.vscode-imagetodatauri) ![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/coderAllan.vscode-imagetodatauri) ![GitHub top language](https://img.shields.io/github/languages/top/CoderAllan/vscode-imagetodatauri.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/CoderAllan/vscode-imagetodatauri.svg) ![GitHub](https://img.shields.io/github/license/CoderAllan/vscode-imagetodatauri.svg)

Image to Data Uri is a Visual Studio Code extension that can convert an image to an html data uri.

A data uri is a way to inline an image directly into the html code by base64 encoding the bytes of the image and inserting the data into the image src tag. The data uri can also be used in other contexts like in SVG files, in javascript or CSS. You can read more detailed about the data uri scheme in this [Wikipedia article](https://en.wikipedia.org/wiki/Data_URI_scheme).

Find it on the [Visual Studio Code marketplace](https://marketplace.visualstudio.com/items?itemName=coderAllan.vscode-imagetodatauri).

## Convert an image in the Explorer menu

You can convert an image from the Explorer menu by right-clicking any Png, Jpeg, Svg or Gif file and the choose the context menu 'Copy image to clipboard as data Uri'.

![Copy image to clipboard as data Uri](https://github.com/CoderAllan/vscode-imagetodatauri/raw/main/images/ConvertImage.gif)

## Inline an image from within the text editor

If you have the image files located on your local storage an referenced them in your source code with a relative or absolute url, you can inline the image as a data uri by selecting the image url an then right-clicking the selection and choose the context menu 'Inline image src as data Uri'.

![Inline image src as data Uri](https://github.com/CoderAllan/vscode-imagetodatauri/raw/main/images/InlineImage.gif)
