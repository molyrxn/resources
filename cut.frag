#version 130
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform int state;

void main(void) {
    vec2 uv = gl_TexCoord[0].st;
    uv.y = 1 - uv.y;

    vec4 t1 = texture2D(sampler1, uv);
    vec4 t2 = texture2D(sampler2, uv);
    vec4 result = vec4(0.0);

    if (state == 0) {
        result = mix(result, t2, 1.0 - t1.a);
    } else {
        result = mix(result, t2, t1.a);
    }

    gl_FragColor = result;
}
