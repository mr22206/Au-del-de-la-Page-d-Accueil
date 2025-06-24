document.addEventListener('DOMContentLoaded', () => {

  const observer = new MutationObserver(() => {
      // On cherche les diagrammes qui n'ont pas encore de 'listener'
      const mermaidContainers = document.querySelectorAll('.mermaid:not([data-lightbox-listener-added])');

      if (mermaidContainers.length === 0) {
          return;
      }

      mermaidContainers.forEach(container => {
          // On marque le diagramme pour ne pas lui ajouter plusieurs 'listeners'
          container.setAttribute('data-lightbox-listener-added', 'true');
          container.style.cursor = 'zoom-in';

          container.addEventListener('click', (e) => {
              e.preventDefault();

              // Au clic, on prépare la liste de TOUS les diagrammes de la page
              const allDiagramsOnPage = document.querySelectorAll('.mermaid');
              const elements = [];
              let clickedIndex = 0; // Pour savoir quel diagramme ouvrir

              allDiagramsOnPage.forEach((diag, index) => {
                  const svg = diag.querySelector('svg');
                  if (!svg) return;

                  // Si c'est le diagramme sur lequel on a cliqué, on note sa position
                  if (diag === container) {
                      clickedIndex = index;
                  }
                  
                  // On crée le contenu propre pour la lightbox
                  const lightboxContent = document.createElement('div');
                  lightboxContent.style.backgroundColor = 'white';
                  lightboxContent.style.padding = '20px';
                  lightboxContent.style.borderRadius = '5px';
                  lightboxContent.appendChild(svg.cloneNode(true));
                  
                  elements.push({
                      content: lightboxContent,
                      width: '90vw'
                  });
              });

              // On crée et on ouvre la lightbox avec notre liste d'éléments
              const lightbox = GLightbox({
                  elements: elements,
                  loop: true,
                  touchNavigation: true,
                  closeOnOutsideClick: true
              });
              lightbox.openAt(clickedIndex);
          });
      });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});