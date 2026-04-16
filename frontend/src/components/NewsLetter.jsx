import React from "react";

function Newsletter() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    event.target.reset();
  };
  return (
    <div className="my-20 text-center">
      <p className="font-prata text-2xl md:text-3xl font-medium">
        Subscribe Now & Get <span className="text-primary">20% Off</span>
      </p>
      <p className="text-muted-foreground mt-3 text-sm md:text-base">
        Stay updated with our latest collections and exclusive offers.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 mx-auto mt-6 flex items-center gap-0 border border-border"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-3 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold whitespace-nowrap hover:bg-primary/90 transition-colors"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
