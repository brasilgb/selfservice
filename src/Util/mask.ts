function maskMoney(value:string) {
	var valorAlterado = value;
	valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
	valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
	valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
	return value = 'R$ '+valorAlterado;
};

export {maskMoney};