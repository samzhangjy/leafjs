export const injectToHTML = (
  HTMLContent: string,
  injectContent: string,
  canidates: RegExp[] = [new RegExp('</body>', 'i'), new RegExp('</svg>'), new RegExp('</head>', 'i')]
) => {
  let tagToInject: string | null = null;

  for (const tag of canidates) {
    const match = tag.exec(HTMLContent);
    if (match) {
      tagToInject = match[0];
      break;
    }
  }

  if (!tagToInject) return HTMLContent;
  return HTMLContent.replace(new RegExp(tagToInject, 'i'), `${injectContent}\n${tagToInject}`);
};
