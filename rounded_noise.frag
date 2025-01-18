#version 120

uniform float round;
uniform vec2 size;
uniform vec4 color;
uniform float noiseIntensity; // Добавляем переменную для управления интенсивностью шума

// Простая функция для генерации шума на основе координат
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float alpha(vec2 d, vec2 d1) {
    vec2 v = abs(d) - d1 + round;
    return min(max(v.x, v.y), 0.0) + length(max(v, .0f)) - round;
}

void main() {
    vec2 centre = .5f * size;
    vec2 coords = gl_TexCoord[0].st * size;

    // Генерация шума на основе текстурных координат
    float noise = random(coords / size) * noiseIntensity;

    // Вычисляем альфа-канал с учётом шума
    float alphaValue = 1.f - smoothstep(0.f, 1.5f, alpha(centre - coords, centre - 1.f));

    // Применяем шум к цвету
    gl_FragColor = vec4(color.rgb + noise, color.a * alphaValue);
}
