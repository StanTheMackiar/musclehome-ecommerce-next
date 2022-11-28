
export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
      return !!match;
  };

export const isValidName = (name: string): boolean => {

    const match = String(name)
    .match(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
    );

  return !!match;

}


export const isValidPassword = (password: string): boolean => {

  const match = String(password)
  .match(
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  );

return !!match;

}
  
  
export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email) 
      ? undefined
      : 'El correo no es válido';
  }
  

    
export const isPassword = (password: string): string | undefined => {
  return isValidPassword(password) 
    ? undefined
    : 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.';
}


export const passwordsMatch = (password: string, confPassword: string): string | undefined => {
  return (password === confPassword)
    ? undefined
    : 'Las contraseñas no coinciden'
}



export const isName = (name: string): string | undefined => {
  return isValidName(name) 
    ? undefined
    : 'Este campo no puede contener números ni signos de puntuación';
}

