export const isCircleCollidingWithRectangle = (circle, rect) => {
    // circle to obiekt reprezentujący okrąg w formie { x, y, radius }
    // rect to obiekt reprezentujący prostokąt w formie { x, y, width, height }
  
    // Znajdź najbliższy punkt na prostokącie do środka okręgu
    let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  
    // Oblicz odległość między środkiem okręgu a najbliższym punktem na prostokącie
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
  
    // Oblicz odległość od środka okręgu do najbliższego punktu na prostokącie
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  
    // Jeśli odległość jest mniejsza lub równa promieniowi okręgu, to nastąpiła kolizja
    return distance <= circle.radius;
  };