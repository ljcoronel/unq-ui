import { useNavigate } from "react-router-dom";

export default function GameInfo({ game }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 w-100 text-start fs-5 fw-semibold lh-base text-dark">
      <div>
        <span>Developer: </span>
        <span className="text-decoration-underline fw-medium">
          {game.developer.name}
        </span>
      </div>
      <div>
        <span>Website: </span>
        <span className="text-decoration-underline fw-medium">
          {game.website}
        </span>
      </div>
      <div>
        <span>Release Date: </span>
        <span className="fw-medium">
          {game.releaseDate.split("T")[0]}
        </span>
      </div>
      <div>
        <span>Tags: </span>
        {game.tags.length > 5 ? (
          <>
            {game.tags.slice(0, 5).map((tag) => (
              <a
                key={tag.id}
                className="text-dark me-2 fw-medium cursor-pointer"
                onClick={() => navigate(`/tags/${tag.id}?tagName=${tag.name}`)}
              >
                {tag.name}
              </a>
            ))}
            <span
              className="text-dark me-2 fw-medium cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#tagsModal"
            >
              more...
            </span>

            <div
              className="modal fade"
              id="tagsModal"
              tabIndex="-1"
              aria-labelledby="tagsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title fw-semibold fs-2"
                      id="tagsModalLabel"
                    >
                      All tags
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-flex flex-wrap gap-2 user-select-none">
                    {game.tags.map((tag) => (
                      <a
                        key={tag.id}
                        data-bs-dismiss="modal"
                        className="text-dark me-2 fw-semibold cursor-pointer"
                        onClick={() =>
                          navigate(`/tags/${tag.id}?tagName=${tag.name}`)
                        }
                      >
                        {tag.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          game.tags.map((tag) => (
            <a
              key={tag.id}
              className="text-dark me-2 fw-medium cursor-pointer"
              onClick={() => navigate(`/tags/${tag.id}?tagName=${tag.name}`)}
            >
              {tag.name}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
