import { group } from "commands";
import { editDocument } from "application";
import { selection, Text, Color, Rectangle } from "scenegraph";

export const GUTTER = 20;
export const SQUARE_WIDTH = 200;
export const FONT_SIZE_QUOTE = 20;
export const FONT_SIZE_AUTHOR = 16;
export const RATIO_TEXT_BOX = 0.6;
export const RATIO_AUTHOR_BOX = 0.7;
export const DEFAULT_AUTHOR = "Anonymous";
export const PALETTE = ['#F75134', '#09EBBA', '#BDD93F', '#4CC2E6', '#DE2A45'];

export const BLACK_OR_WHITE = {
  true: '#FFFFFF',
  false: '#000000'
};

export const SAFE_FONTS = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Times New Roman",
  "Didot",
  "Georgia",
  "American Typewriter",
  "Andale Mono",
  "Courier",
  "Lucida Console",
  "Monaco",
  "Bradley Hand",
  "Brush Script MT",
  "Luminari",
  "Comic Sans MS"
];

export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/*
  CHALLENGE #1

  The text can be bigger than the box itself,
  bleeding out of it, which we don't want. There are
  many ways to accomplish this but the simplest
  I could come up with is to adjust the font size to
  make it fit. There's probably a more elegant way.
*/
function fitTextToNode(text, node, prop, ratio) {
  const isBigger = () => text.localBounds[prop] / node.localBounds[prop] > ratio;

  while (isBigger()) {
    --text.fontSize;
  }
}


export function insertQuote({ text, author }) {
  editDocument(() => {
    // make rectangle node
    const rectangleNode = new Rectangle();
    rectangleNode.width = SQUARE_WIDTH;
    rectangleNode.height = SQUARE_WIDTH;
    rectangleNode.fill = new Color(getRandomItem(PALETTE));

    // we'll use this later to switch between black/white
    const blackOrWhiteText = getRandomItem([true, false]);

    // make quote text node
    const quoteNode = new Text();
    quoteNode.text = text;
    quoteNode.fill = new Color(BLACK_OR_WHITE[blackOrWhiteText]);
    quoteNode.fontSize = FONT_SIZE_QUOTE;
    quoteNode.fontFamily = getRandomItem(SAFE_FONTS);

    // this makes the text to wrap at desired width
    quoteNode.layoutBox = {
      type: Text.AUTO_HEIGHT,
      width: SQUARE_WIDTH - (2 * GUTTER),
    };

    // make author text node
    const authorNode = new Text();
    authorNode.text = author || DEFAULT_AUTHOR;
    authorNode.fill = new Color(BLACK_OR_WHITE[!blackOrWhiteText]);
    authorNode.fontFamily = getRandomItem(SAFE_FONTS);
    authorNode.fontSize = FONT_SIZE_AUTHOR;

    // insert nodes into parent
    selection.insertionParent.addChild(rectangleNode);
    selection.insertionParent.addChild(quoteNode);
    selection.insertionParent.addChild(authorNode);

    fitTextToNode(quoteNode, rectangleNode, 'height', RATIO_TEXT_BOX);
    fitTextToNode(authorNode, rectangleNode, 'width', RATIO_AUTHOR_BOX);

    // position the rectangleNode at insertionPoint center
    rectangleNode.placeInParentCoordinates(
      { x: (rectangleNode.width / 2), y: (rectangleNode.height / 2) },
      selection.insertionParent.localCenterPoint
    );

    // position the quoteTextNode at insertionPoint center, relative to rectangleNode
    quoteNode.placeInParentCoordinates(
      {
        x: rectangleNode.localCenterPoint.x - GUTTER,
        y: rectangleNode.localCenterPoint.y - GUTTER,
      },
      selection.insertionParent.localCenterPoint
    );

    // position the authorNode at insertionPoint center, relative to rectangleNode
    authorNode.placeInParentCoordinates(
      {
        x: rectangleNode.localCenterPoint.x - GUTTER,
        y: rectangleNode.localCenterPoint.x - rectangleNode.height + GUTTER,
      },
      selection.insertionParent.localCenterPoint
    );

    // group elements for convenience
    selection.items = [quoteNode, authorNode, rectangleNode];
    group();
  });
}