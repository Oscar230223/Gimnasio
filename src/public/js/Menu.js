document.addEventListener("DOMContentLoaded", function() {
    const menuItems = [
        { name: "INICIO", url: "/" },
        { name: "ALUMNOS", url: "/Alumnos"},
        { name: "ACERCA DE NOSOTROS", url: "/SobreNosotros" },
        { name: "ADMISIÓN", url: "/ExamenAdmision" },
        { name: "CARRERAS", url: "/Carreras" },
        { name: "BECAS", url: "/Becas"}
    ];

    const menuList = document.getElementById("menu-list");

    menuItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.name;
        li.appendChild(a);
        menuList.appendChild(li);
    });
});
