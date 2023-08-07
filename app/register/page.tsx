import React from "react";
import Head from "next/head";
import { Montserrat, Lato } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

function register() {
  return (
    <>
      <Head>
        <title>Minerva LMS</title>
        <meta
          name="description"
          content="Plataforma para el apredizaje online"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section id="user-register">
          <div className="register-div">
            <h1>Regístrate</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do
              eiusmod tempor incididunt ut labore
            </p>

            <form>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=" "
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label form="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Acepto </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="help-div">
            <span>
              Si tienes alguna dificultad comunicate con nuestro{" "}
              <a href="#">Centro de atención</a>.
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

export default register;
