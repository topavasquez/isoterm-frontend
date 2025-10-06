import aire from "../../assets/aireacondicionado.jpg";

export function Cards({ title, description, link }) {
  return (
    <div class="card" style={{ width: "26rem", textAlign: "center" }}>
      <img src={aire} class="card-img-top" alt={title} />
      <div class="card-body bg-light">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        <a href={link} class="btn btn-primary">
          Ver el producto
        </a>
      </div>
    </div>
  );
}
