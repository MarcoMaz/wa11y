interface UpdateComplete {
  updateComplete: Promise<void>;
}

export const createTestComponent = async <T extends HTMLElement>(
  tagName: string,
  innerSelector: string,
  attributes?: Record<string, string>
) => {
  const component = document.createElement(tagName) as T &
    Partial<UpdateComplete>;

  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      component.setAttribute(key, value);
    }
  }

  document.body.appendChild(component);

  if (component.updateComplete) {
    await component.updateComplete;
  }

  const innerElement = component.querySelector(innerSelector);

  if (!innerElement) {
    throw new Error(`<${innerSelector}> not found inside <${tagName}>`);
  }

  return {
    component,
    innerElement,
    sanitizeText: (el: HTMLElement | null) => el?.textContent?.trim() ?? '',
  };
};
