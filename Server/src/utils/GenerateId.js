export function generateUniqueID() {
    const characters = '0123456789abcdef';
    let uniqueID = '';
  
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }
  
    return uniqueID;
  }