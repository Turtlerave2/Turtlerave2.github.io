(function () {
    async function includeAll() {
        const includes = document.querySelectorAll('[data-include]');
        const promises = Array.from(includes).map(async (el) => {
            const path = el.getAttribute('data-include');
            try {
                const res = await fetch(path);
                if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
                const text = await res.text();
                el.innerHTML = text;
            } catch (err) {
                console.error('Include failed for', path, err);
            }
        });
        await Promise.all(promises);
        document.dispatchEvent(new Event('includesLoaded'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', includeAll);
    } else {
        includeAll();
    }
})();
