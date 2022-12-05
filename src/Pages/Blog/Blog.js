import React from "react";

const Blog = () => {
  return (
    <div className="container mx-auto mb-24">
      <h3 className="text-center text-secondary my-10 lg:text-4xl text-3xl font-semibold">
        Some Important Questions You <br />
        Should Know About !!
      </h3>

      <article className="mx-auto lg:w-3/4 w-10/12 rounded-lg lg:p-10 p-5 mb-5 bg-gray-300 bg-opacity-50">
        <h2 className="text-center font-semibold text-3xl pb-5 text-cyan-800">
          What are the different ways to manage a state in a React application?
        </h2>
        <div className="text-gray-700">
          <p className="text-green-700 text-lg text-medium">
            The Four Kinds of React State to Manage
          </p>
          <li>Local state</li>
          <li>Global state</li>
          <li>Server state</li>
          <li>URL state</li>
          <p className="text-secondary mt-5 text-lg text-medium underline">
            Local (UI) state
          </p>
          <p>
            Local state is data we manage in one or another component. Local
            state is most often managed in React using the useState hook. For
            example, local state would be needed to show or hide a modal
            component or to track values for a form component, such as form
            submission, when the form is disabled and the values of a form’s
            inputs.
          </p>
          <p className="text-secondary mt-5 text-lg text-medium underline">
            Global (UI) state
          </p>
          <p>
            Global state is data we manage across multiple components. Global
            state is necessary when we want to get and update data anywhere in
            our app, or in multiple components at least. A common example of
            global state is authenticated user state. If a user is logged into
            our app, it is necessary to get and change their data throughout our
            application. Sometimes state we think should be local might become
            global.
          </p>
          <p className="text-secondary mt-5 text-lg text-medium underline">
            Server state
          </p>
          <p>
            Data that comes from an external server that must be integrated with
            our UI state. Server state is a simple concept, but can be hard to
            manage alongside all of our local and global UI state. <br />
            <br /> There are several pieces of state that must be managed every
            time you fetch or update data from an external server, including
            loading and error state. Fortunately there are tools such as SWR and
            React Query that make managing server state much easier.
          </p>
          <p className="text-secondary mt-5 text-lg text-medium underline">
            URL state
          </p>
          <p>
            Data that exists on our URLs, including the pathname and query
            parameters. URL state is often missing as a category of state, but
            it is an important one. In many cases, a lot of major parts of our
            application rely upon accessing URL state. Try to imagine building a
            blog without being able to fetch a post based off of its slug or id
            that is located in the URL! <br /> <br /> There are undoubtedly more
            pieces of state that we could identify, but these are the major
            categories worth focusing on for most applications you build.
          </p>
        </div>
      </article>
      <article className="mx-auto lg:w-3/4 w-10/12 rounded-lg lg:p-10 p-5 mb-5 bg-gray-300 bg-opacity-50">
        <h2 className="text-center font-semibold text-3xl pb-5 text-cyan-800">
          How does prototypical inheritance work?
        </h2>
        <p className="text-gray-700 mb-5">
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object.getPrototypeOf and Object.
        </p>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20200520193336/Untitled-Diagram108.png"
          alt=""
        />
      </article>
      <article className="mx-auto lg:w-3/4 w-10/12 rounded-lg lg:p-10 p-5 mb-5 bg-gray-300 bg-opacity-50">
        <h2 className="text-center font-semibold text-3xl pb-5 text-cyan-800">
          What is a unit test? Why should we write unit tests?
        </h2>
        <div className="text-gray-700">
          <p>
            Unit testing involves the testing of each unit or an individual
            component of the software application. It is the first level of
            functional testing. The aim behind unit testing is to validate unit
            components with its performance.
          </p>
          <p>
            A unit is a single testable part of a software system and tested
            during the development phase of the application software. The
            purpose of unit testing is to test the correctness of isolated code.
            A unit component is an individual function or code of the
            application. White box testing approach used for unit testing and
            usually done by the developers.
          </p>
          <p className="text-green-600 mt-2 text-lg underline">
            Why Unit Testing?
          </p>
          <p>
            In a testing level hierarchy, unit testing is the first level of
            testing done before integration and other remaining levels of the
            testing. It uses modules for the testing process which reduces the
            dependency of waiting for Unit testing frameworks, stubs, drivers
            and mock objects are used for assistance in unit testing.
          </p>{" "}
          <br />
          <p>
            Generally, the software goes under four level of testing: Unit
            Testing, Integration Testing, System Testing, and Acceptance Testing
            but sometimes due to time consumption software testers does minimal
            unit testing but skipping of unit testing may lead to higher defects
            during Integration Testing, System Testing, and Acceptance Testing
            or even during Beta Testing which takes place after the completion
            of software application.
          </p>
        </div>
      </article>
      <article className="mx-auto lg:w-3/4 w-10/12 rounded-lg lg:p-10 p-5 mb-5 bg-gray-300 bg-opacity-50">
        <h2 className="text-center font-semibold text-3xl pb-5 text-cyan-800">
          React vs. Angular vs. Vue?
        </h2>
        <div className="text-gray-700">
          <p className="text-xl font-semibold text-violet-600 underline">
            React
          </p>
          <p>
            <a
              className="link  link-info"
              href="https://reactjs.org/docs/rendering-elements.html"
            >
              React Elements
            </a>
            are the smallest building blocks of React apps. They are more
            powerful than DOM elements because the React DOM makes sure to
            update them efficiently whenever something changes. <br /> <br />
            React is based on JavaScript, but it’s mostly combined with JSX
            (JavaScript XML), a syntax extension that allows you to create
            elements that contain HTML and JavaScript at the same time.
            <br /> <br />
            <a
              className="link  link-info"
              href="https://reactjs.org/docs/components-and-props.html"
            >
              Components
            </a>{" "}
            are larger building blocks that define independent and reusable
            pieces to be used throughout the application. They accept inputs
            called props and produce elements that are then displayed to the
            user.
            <br /> <br />
            Anything you create with JSX could also be created with the React
            JavaScript API, but most developers prefer JSX because it’s more
            intuitive.
          </p>
          <p className="text-xl font-semibold text-violet-600 underline">
            Angular
          </p>
          <p>
            Projects in Angular are structured into Modules, Components, and
            Services. Each Angular application has at least one root component
            and one root module. <br /> <br />
            Each component in Angular contains a Template, a Class that defines
            the application logic, and MetaData (Decorators). The metadata for a
            component tells Angular where to find the building blocks that it
            needs to create and present its view.
            <br /> <br />
            Angular is built in TypeScript, so its use is recommended to get the
            most seamless experience, but plain JavaScript is also supported.
            Angular templates are written in HTML but can also include{" "}
            <a
              className="link  link-info"
              href="https://angular.io/guide/template-syntax"
            >
              Angular template syntax
            </a>{" "}
            with special directives to output reactive data and render multiple
            elements, among other things.
          </p>
          <p className="text-xl font-semibold text-violet-600 underline">Vue</p>
          <p>
            The Vue.js core library focuses on the View layer only. It’s called
            a progressive framework because you can extend its functionality
            with official and third-party packages, such as Vue Router or Vuex,
            to turn it into an actual framework. <br /> <br />
            Vue’s templating syntax lets you create View components, and it
            combines familiar HTML with special directives and features. This{" "}
            <a
              className="link  link-info"
              href="https://v3.vuejs.org/guide/template-syntax.html"
            >
              templating syntax
            </a>{" "}
            is preferred, even though raw JavaScript and JSX are also supported.
            <br /> <br />
            <a
              className="link  link-info"
              href="https://v3.vuejs.org/guide/component-basics.html"
            >
              Components
            </a>{" "}
            in Vue are small, self-contained, and can be reused throughout the
            application.{" "}
            <a
              className="link  link-info"
              href="https://v3.vuejs.org/guide/single-file-component.html"
            >
              Single File Components
            </a>{" "}
            (SFCs) with the .vue extension contain HTML, CSS, and JavaScript so
            that all relevant code resides in one file.
          </p>
        </div>
      </article>
    </div>
  );
};

export default Blog;
