import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function expandAndScroll(hash: string, attempts = 0) {
  if (attempts > 20) return; // give up after 2 seconds
  
  try {
    const id = decodeURIComponent(hash.substring(1));
    const element = document.getElementById(id);
    
    if (element) {
      let parent = element.parentElement;
      let changed = false;
      
      while (parent) {
        if (parent.tagName === 'DETAILS' && !parent.hasAttribute('open')) {
          const summary = parent.querySelector('summary');
          if (summary) {
            // Trigger the React onClick handler of the Docusaurus Details component
            summary.click();
          } else {
            // Fallback for native details
            parent.setAttribute('open', '');
          }
          changed = true;
        }
        parent = parent.parentElement;
      }
      
      // Delay scrolling slightly to allow for Docusaurus render & transition animations
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optional glow effect or highlight could go here
      }, 300);
      
    } else {
      setTimeout(() => expandAndScroll(hash, attempts + 1), 100);
    }
  } catch (e) {
    // ignore invalid hashes
  }
}

export function onRouteDidUpdate({ location }: { location: any }) {
  if (ExecutionEnvironment.canUseDOM && location.hash) {
    expandAndScroll(location.hash);
  }
}

