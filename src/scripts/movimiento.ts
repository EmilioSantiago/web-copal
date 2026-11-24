/**
 * Carga GSAP + ScrollTrigger SOLO si:
 * - la persona no pidió menos movimiento (prefers-reduced-motion), y
 * - la página ya terminó de cargar (evento load) → no compite con el LCP.
 * Si no se cumple, no se descarga ni un byte de GSAP.
 */
type Gsap = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;

export function conMovimiento(montar: (gsap: Gsap, ScrollTrigger: ST) => void): void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const iniciar = async () => {
		const [{ gsap }, { ScrollTrigger }] = await Promise.all([
			import('gsap'),
			import('gsap/ScrollTrigger'),
		]);
		gsap.registerPlugin(ScrollTrigger);
		montar(gsap, ScrollTrigger);
	};

	if (document.readyState === 'complete') iniciar();
	else window.addEventListener('load', () => iniciar(), { once: true });
}
