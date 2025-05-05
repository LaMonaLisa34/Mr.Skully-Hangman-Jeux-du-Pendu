document.addEventListener('mousemove', (event) => {
    // Écoute l'événement de mouvement de la souris et récupère ses coordonnées
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const yeux = document.querySelectorAll('.œil');
    yeux.forEach((œil) => {
        const imageOeil = œil.querySelector('img');
        // Récupère la position et les dimensions de l'œil dans la fenêtre
        const œilRect = œil.getBoundingClientRect();
        // Calcule la position horizontale du centre de l'œil
        const œilCenterX = œilRect.left + œilRect.width / 2;
        // Calcule la position verticale du centre de l'œil
        const œilCenterY = œilRect.top + œilRect.height / 2;
        // Calcule l'angle de direction entre la souris et le centre de l'œil
        const angle = Math.atan2(mouseY - œilCenterY, mouseX - œilCenterX);
        // Déplacement horizontal en fonction de l'angle calculé
        const moveX = Math.cos(angle) * 15;
        // Déplacement vertical en fonction de l'angle calculé
        const moveY = Math.sin(angle) * 15;
        // Applique une transformation CSS pour déplacer la pupille
        imageOeil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
