<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $personagem = htmlspecialchars($_POST['personagem']);
    $jogador = htmlspecialchars($_POST['jogador']);
    $raca = htmlspecialchars($_POST['raca']);
    $classe = htmlspecialchars($_POST['classe']);
    $nivel = htmlspecialchars($_POST['nivel']);
    $divindade = htmlspecialchars($_POST['divindade']);

    $linha = "Personagem: $personagem | Jogador(a): $jogador | Raça: $raca | Classe: $classe | Nível: $nivel | Divindade: $divindade\n";
    file_put_contents("dados.txt", $linha, FILE_APPEND);

    echo "Personagem salvo com sucesso!";
} else {
    echo "Acesso inválido.";
}
?>
