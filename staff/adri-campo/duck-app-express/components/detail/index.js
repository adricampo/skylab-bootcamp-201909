module.exports = function ({ item: { id, title, image, description, price, isFav }, onBack, favPath }) {
    return `<section class="view detail">
                <h2 class="detail__title">${title}</h2>
                <img class="detail__image" src=${image} />
                <p class="detail__description">${description}</p>
                <a class="detail__store" href=${store}>Go to store</a>
                <span class="detail__price">${price}</span>
                <form method="post" action="${favPath}">
                    <input type="hidden" name="id" value="${id}">
                    <button type="submit">${isFav ? '🧡' : '💔'}</button>
                </form>
                <form method="post" action="${onBack}"><button class="search__logout">Back</button></form>
        </section>`
}