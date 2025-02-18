uniform sampler2D u_texture;
uniform float alpha;

void main() {
    vec2 st = gl_TexCoord[0].st;
    vec4 color = texture2D(u_texture, st);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec4 grayscaleColor = vec4(gray, gray, gray, color.a);
    gl_FragColor = mix(color, grayscaleColor, alpha);
}
