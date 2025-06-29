<?php
function getAllHtmlFiles($dir) {
    $files = [];
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $path = $dir . '/' . $item;
        if (is_dir($path)) {
            $files = array_merge($files, getAllHtmlFiles($path));
        } elseif (pathinfo($path, PATHINFO_EXTENSION) === 'html') {
            $files[] = ltrim($path, './'); // baştaki ./ karakterini kaldır
        }
    }
    return $files;
}

header('Content-Type: application/json');
echo json_encode(getAllHtmlFiles('.'), JSON_UNESCAPED_UNICODE);
