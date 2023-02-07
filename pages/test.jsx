import _ from "lodash";

const data = {
  users: {
    1: { id: 1, firstName: "Johny", lastName: "Boy", carsLiked: [1, 3, 5] },
    3: { id: 3, firstName: "Didko", lastName: "Baby", carsLiked: [2, 4, 6] },
    111: {
      id: 111,
      firstName: "Keit",
      lastName: "Girl",
      carsLiked: [6, 4],
    },
    5: { id: 5, firstName: "Nub", lastName: "Scrubov", carsLiked: [] },
    27: { id: 27, firstName: "Alex", lastName: "kun", carsLiked: [2] },
  },
  cars: {
    1: { id: 1, brand: "BMW", partsToFix: [10, 20, 30] },
    2: { id: 2, brand: "Mercedec", partsToFix: [20] },
    3: { id: 3, brand: "Radomobil", partsToFix: [10] },
    4: { id: 4, brand: "Audi", partsToFix: [] },
    5: { id: 5, brand: "Porsche", partsToFix: [20, 30] },
    6: { id: 6, brand: "Lada", partsToFix: [30] },
  },
  parts: {
    10: { id: 10, partName: "Engine" },
    20: { id: 20, partName: "Transmission" },
    30: { id: 30, partName: "Air Conditioning" },
  },
};
const usersArray = Object.values(data.users);

const arrayData = [
  {
    id: 1,
    firstName: "Johny",
    lastName: "Boy",
    carsLiked: [
      {
        id: 1,
        brand: "BMW",
        partsToFix: [
          { id: 10, partName: "Engine" },
          { id: 20, partName: "Transmission" },
          { id: 30, partName: "Air Conditioning" },
        ],
      },
      {
        id: 3,
        brand: "Radomobil",
        partsToFix: [{ id: 10, partName: "Engine" }],
      },
      {
        id: 5,
        brand: "Porsche",
        partsToFix: [
          { id: 20, partName: "Transmission" },
          { id: 30, partName: "Air Conditioning" },
        ],
      },
    ],
  },
  {
    id: 3,
    firstName: "Didko",
    lastName: "Baby",
    carsLiked: [
      {
        id: 2,
        brand: "Mercedec",
        partsToFix: [{ id: 20, partName: "Transmission" }],
      },
      { id: 4, brand: "Audi", partsToFix: [] },
      {
        id: 6,
        brand: "Lada",
        partsToFix: [{ id: 30, partName: "Air Conditioning" }],
      },
    ],
  },
  {
    id: 5,
    firstName: "Nub",
    lastName: "Scrubov",
    carsLiked: [],
  },
  {
    id: 27,
    firstName: "Alex",
    lastName: "kun",
    carsLiked: [
      {
        id: 2,
        brand: "Mercedec",
        partsToFix: [{ id: 20, partName: "Transmission" }],
      },
    ],
  },
  {
    id: 111,
    firstName: "Keit",
    lastName: "Girl",
    carsLiked: [
      { id: 4, brand: "Audi", partsToFix: [] },
      {
        id: 6,
        brand: "Lada",
        partsToFix: [{ id: 30, partName: "Air Conditioning" }],
      },
    ],
  },
];

const result = Object.values(data.users).map((user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    carsLiked: user.carsLiked.map((carId) => {
      return {
        id: data.cars[carId].id,
        brand: data.cars[carId].brand,
        partsToFix: data.cars[carId].partsToFix.map((partId) => {
          return {
            id: data.parts[partId].id,
            partName: data.parts[partId].partName,
          };
        }),
      };
    }),
  };
});

const resultShort = Object.values(data.users).map((user) => ({
  ...user,
  carsLiked: user.carsLiked.map((carId) => ({
    ...data.cars[carId],
    partsToFix: data.cars[carId].partsToFix.map((partId) => data.parts[partId]),
  })),
}));

const users = arrayData.reduce((prev, curr) => {
  return {
    ...prev,
    [curr.id]: {
      ...curr,
      carsLiked: curr.carsLiked.map((car) => car.id),
    },
  };
}, {});

const cars = arrayData.reduce((prev, curr) => {
  return {
    ...prev,
    ...curr.carsLiked.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.id]: {
          ...curr,
          partsToFix: curr.partsToFix.map((part) => part.id),
        },
      };
    }, {}),
  };
}, {});

const parts = arrayData.reduce((prev, curr) => {
  return {
    ...prev,
    ...curr.carsLiked.reduce((prev, curr) => {
      return {
        ...prev,
        ...curr.partsToFix.reduce((prev, curr) => {
          return {
            ...prev,
            [curr.id]: curr,
          };
        }, {}),
      };
    }, {}),
  };
}, {});

const newData = { users, cars, parts };

const numArray = Object.values(data).reduce((prev, curr) => {
  return [...prev, Object.values(curr).map((asd) => asd.id)];
}, []);
numArray.shift();

const flattened = numArray.flat();

//////////////////////////////////////////////////////////////////////////

const numArray2 = arrayData.map((user) => {
  return user.carsLiked.reduce((prev, cur) => {
    return [
      ...prev,
      cur.id,
      ...cur.partsToFix.reduce((prev, cur) => {
        return [...prev, cur.id];
      }, []),
    ];
  }, []);
});

const compNum = (a, b) => {
  return a - b;
};

const flattened2 = numArray2.flat();
const uniqueArray = _.uniq(flattened2).sort(compNum);

/////////////////////////////////////////////////////////////////////////

const stringArray = arrayData.reduce((prev, cur) => {
  return [
    ...prev,
    cur.firstName,
    cur.lastName,
    ...cur.carsLiked.reduce((prev, cur) => {
      return [
        ...prev,
        cur.brand,
        ...cur.partsToFix.map((part) => part.partName),
      ];
    }, []),
  ];
}, []);

const stringArray2 = Object.values(
  arrayData
    .reduce((prev, cur) => {
      return [
        ...prev,
        ...Object.values(cur),
        ...cur.carsLiked.reduce((prev, cur) => {
          return [
            ...prev,
            ...Object.values(cur),
            ...Object.values(
              cur.partsToFix.reduce((prev, cur) => {
                return [...prev, ...Object.values(cur)];
              }, [])
            ),
          ];
        }, []),
      ];
    }, [])
    .filter((item) => typeof item === "string")
);

const transformedArray = arrayData.reduce((prev, cur) => {
  return [
    ...prev,
    {
      id: cur.id,
      text: `${cur.firstName} ${cur.lastName}`,
      children: cur.carsLiked.reduce((prev, cur) => {
        return [
          ...prev,
          {
            id: cur.id,
            text: cur.brand,
            children: cur.partsToFix.map((part) => {
              return { id: part.id, text: part.partName };
            }),
          },
        ];
      }, []),
    },
  ];
}, []);

const addParams = (a, b) => {
  return a + b;
};

const arr2 = ["a", "b", "c", "d", "e", "f"];

const firstTwo = arr2.slice(0, 2);
const rest = arr2.slice(2);

// const myFunc = ([x, y, ...params]) => {
//   console.log([x, y]);
//   console.log(params);
// };
// myFunc(arr2);

const firstTwo2 = ([a, b, ...rest]) => {
  return [a, b];
};

const rest2 = ([a, b, ...rest]) => {
  return rest;
};

const [a, b, ...rest1] = arr2;

const firstTwo3 = [a, b];

// console.log(firstTwo3, rest1);

const Test = () => {
  return (
    <div
      style={{
        paddingTop: "60px",
        display: "flex",
        justifyContent: " space-around",
      }}
    >
      <div>
        {usersArray.map((user) => {
          return (
            <div key={user.id}>
              <h1>User: {user.id}</h1>
              <h3>
                Name: {user.firstName} {user.lastName}
              </h3>
              <div>
                Cars Liked:
                {user.carsLiked.map((carsLikedId) => {
                  return (
                    <ul key={carsLikedId}>
                      {data.cars[carsLikedId].brand}
                      <ul>
                        Parts to fix:
                        {data.cars[carsLikedId].partsToFix.map((partId) => {
                          return (
                            <li key={partId}>{data.parts[partId].partName}</li>
                          );
                        })}
                      </ul>
                    </ul>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {result.map((user) => {
          return (
            <div key={user.id}>
              <h1>User: {user.id}</h1>
              <h3>
                Name: {user.firstName} {user.lastName}
              </h3>
              <div>
                Cars Liked
                {user.carsLiked.map((cars) => (
                  <ul key={cars.id}>
                    {cars.brand}
                    <ul>
                      Parts to fix
                      {cars.partsToFix.map((parts) => (
                        <li key={parts.id}>{parts.partName}</li>
                      ))}
                    </ul>
                  </ul>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Test;
