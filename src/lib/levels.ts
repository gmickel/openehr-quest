export interface Level {
  title: string;
  description: string;
  challenge: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  language: string;
}

export const levels: Level[] = [
  {
    title: 'The Template Tavern',
    description:
      'Welcome to The Template Tavern! Your first quest is to decipher a mysterious web template. Choose the correct interpretation to proceed.',
    challenge:
      "You encounter a web template with the following structure:\n\n<composition>\n  <content>\n    <observation archetype_id='openEHR-EHR-OBSERVATION.blood_pressure.v1'>\n      <data>\n        <events xsi:type='POINT_EVENT'>\n          <data>\n            <items id='at0004'>\n              <value xsi:type='DV_QUANTITY'>\n                <magnitude>120</magnitude>\n                <units>mm[Hg]</units>\n              </value>\n            </items>\n          </data>\n        </events>\n      </data>\n    </observation>\n  </content>\n</composition>",
    options: [
      "It's a recipe for a health potion",
      "It's a map to the hidden treasure of OpenEHR",
      "It's a blood pressure measurement of 120 mm[Hg]",
      "It's the secret code to unlock the next dungeon",
    ],
    correctAnswer: 2,
    explanation:
      "This template represents a blood pressure measurement. The 'observation' element with the archetype ID 'openEHR-EHR-OBSERVATION.blood_pressure.v1' indicates it's for blood pressure, and the value 120 mm[Hg] is clearly visible in the structure.",
    hint: 'Look for the archetype ID and the value within the structure.',
    language: 'xml',
  },
  {
    title: 'The Archetype Archives',
    description:
      "You've entered the Archetype Archives. Decipher the ancient scrolls to progress!",
    challenge: 'What is the primary purpose of archetypes in OpenEHR?',
    options: [
      'To store patient data',
      'To define reusable clinical concepts',
      'To create user interfaces',
      'To manage database connections',
    ],
    correctAnswer: 1,
    explanation:
      'Archetypes in OpenEHR are used to define reusable clinical concepts. They provide a way to model clinical information that can be shared across different systems and contexts.',
    hint: 'Think about the role of archetypes in standardizing clinical data.',
    language: 'text',
  },
  {
    title: 'The Reference Model Riddle',
    description:
      "The Reference Model Riddle challenges your understanding of OpenEHR's foundational structure!",
    challenge: 'What is the primary purpose of the OpenEHR Reference Model?',
    options: [
      'To store patient data directly',
      'To define the structure of clinical archetypes',
      'To provide a stable set of abstracting building blocks for clinical information',
      'To manage user authentication in EHR systems',
    ],
    correctAnswer: 2,
    explanation:
      'The OpenEHR Reference Model provides a stable set of abstracting building blocks for clinical information. It defines the logical structure of EHRs and the general set of data types used in healthcare, forming the foundation upon which archetypes and templates are built.',
    hint: 'Think about the fundamental structure that supports the more specific clinical models in OpenEHR.',
    language: 'text',
  },
  {
    title: 'The Composition Cauldron',
    description:
      'Welcome to the Composition Cauldron, where data elements are brewed into meaningful records!',
    challenge: 'In OpenEHR, what is a composition primarily used for?',
    options: [
      'To define database schemas',
      'To create user interfaces',
      'To represent a clinical document or event',
      'To manage system security',
    ],
    correctAnswer: 2,
    explanation:
      "In OpenEHR, a composition is used to represent a clinical document or event. It's the top-level structure that contains all the clinical data for a single record, such as a consultation, a test result, or a discharge summary.",
    hint: 'Consider what might represent a complete, standalone clinical record.',
    language: 'text',
  },
  {
    title: 'The Two-Level Tangle',
    description:
      "The Two-Level Tangle tests your grasp of OpenEHR's modeling approach!",
    challenge: 'What is meant by the "two-level modeling" approach in OpenEHR?',
    options: [
      'It refers to having separate models for inpatient and outpatient care',
      'It separates the technical reference model from the clinical knowledge model',
      'It means having two levels of user access in the EHR system',
      'It describes a two-step process for creating medical records',
    ],
    correctAnswer: 1,
    explanation:
      'The two-level modeling approach in OpenEHR separates the technical reference model from the clinical knowledge model. This allows for a stable technical foundation while enabling flexible and evolving clinical content models.',
    hint: 'Consider how OpenEHR separates different aspects of its modeling to achieve both stability and flexibility.',
    language: 'text',
  },
  {
    title: 'The Composition Composer',
    description:
      'The Composition Composer challenges you to orchestrate the elements of an OpenEHR composition!',
    challenge:
      'Which of the following is NOT typically found at the root level of an OpenEHR composition?',
    options: ['context', 'category', 'content', 'observation'],
    correctAnswer: 3,
    explanation:
      "In an OpenEHR composition, 'observation' is not typically found at the root level. The root level usually includes 'context', 'category', and 'content'. Observations and other clinical entry types are usually nested within the 'content' section.",
    hint: 'Think about the high-level structure of a composition and what elements define its overall properties.',
    language: 'text',
  },
  {
    title: 'The Integration Inquisitor',
    description:
      'The Integration Inquisitor will test your knowledge of posting compositions to an OpenEHR system.',
    challenge:
      'Which HTTP method and content type should you use when posting a composition to an OpenEHR system?',
    options: [
      'GET request with application/json content type',
      'POST request with application/xml content type',
      'PUT request with text/plain content type',
      'POST request with application/json content type',
    ],
    correctAnswer: 3,
    explanation:
      "When posting a new composition to an OpenEHR system, you typically use a POST request with application/json content type. This allows you to send structured data in a format that's widely supported and easy to work with.",
    hint: 'Think about which HTTP method is typically used for creating new resources.',
    language: 'text',
  },
  {
    title: 'The Versioning Vault',
    description:
      'Welcome to the Versioning Vault, where the history of health records is preserved through the ages!',
    challenge:
      'When retrieving a specific version of a composition, which of the following is true?',
    options: [
      'You must always retrieve the latest version',
      'You can specify a version number or time to get a specific historical version',
      'Versioning is not supported in OpenEHR',
      'You need to retrieve all versions and manually find the one you want',
    ],
    correctAnswer: 1,
    explanation:
      'OpenEHR supports versioning of compositions. You can retrieve a specific version by specifying either a version number or a timestamp, allowing access to the historical state of a composition at a particular point in time.',
    hint: 'Think about how you might want to access historical data in a medical record system.',
    language: 'text',
  },
  {
    title: 'The Constraint Connoisseur',
    description:
      'The Constraint Connoisseur tests your ability to understand and apply constraints in OpenEHR archetypes!',
    challenge:
      'Which of the following is a valid way to constrain a quantity data type in an archetype?',
    options: [
      'Setting a specific value that must be used',
      'Defining a range of allowed values',
      'Specifying a list of allowed units',
      'All of the above',
    ],
    correctAnswer: 3,
    explanation:
      'In OpenEHR archetypes, quantity data types can be constrained in multiple ways. You can set a specific value, define a range of allowed values, or specify a list of allowed units. Often, a combination of these constraints is used to precisely define the acceptable values for a quantity.',
    hint: 'Consider the various ways you might want to limit or specify how a quantity can be recorded in a clinical context.',
    language: 'text',
  },
  {
    title: 'The Flat Format Fable',
    description:
      'The Flat Format Fable challenges you to understand different data representations in OpenEHR!',
    challenge: 'What is the purpose of the "flat" format in OpenEHR?',
    options: [
      'To compress data for more efficient storage',
      'To simplify data entry forms for clinicians',
      'To provide a simplified format for API calls and data exchange',
      'To flatten the organizational hierarchy in healthcare institutions',
    ],
    correctAnswer: 2,
    explanation:
      'The flat format in OpenEHR is used to provide a simplified format for API calls and data exchange. It presents complex hierarchical data in a flattened structure, making it easier to work with in many programming contexts and simplifying data interchange.',
    hint: 'Think about how complex hierarchical data might be simplified for easier handling in certain contexts.',
    language: 'text',
  },
  {
    title: 'The Binding Bard',
    description:
      'The Binding Bard challenges you to understand the intricacies of binding terminologies in OpenEHR!',
    challenge:
      'Which method is used to bind external terminologies to archetype nodes?',
    options: [
      'Direct insertion of codes into archetypes',
      "Using the 'term_bindings' section in archetypes",
      'Creating separate terminology archetypes',
      'Modifying the reference model to include terminologies',
    ],
    correctAnswer: 1,
    explanation:
      "OpenEHR uses the 'term_bindings' section in archetypes to bind external terminologies. This allows for flexible integration of various coding systems while maintaining the archetype structure.",
    hint: 'Think about how OpenEHR maintains separation between its structure and external vocabularies.',
    language: 'text',
  },
  {
    title: 'The Operational Template Oracle',
    description:
      'The Operational Template Oracle tests your knowledge of OPTs in the OpenEHR ecosystem!',
    challenge:
      'What is the primary purpose of an Operational Template (OPT) in OpenEHR?',
    options: [
      'To replace archetypes in modern OpenEHR implementations',
      'To provide a fully specialized and flattened form of a template for direct use in systems',
      'To create new archetypes based on existing ones',
      'To define the operational procedures in a healthcare setting',
    ],
    correctAnswer: 1,
    explanation:
      "An Operational Template (OPT) in OpenEHR is a fully specialized and flattened form of a template. It's designed for direct use in systems, containing all the necessary information from archetypes and templates in a readily usable format.",
    hint: 'Consider what form of templates would be most immediately usable by EHR systems.',
    language: 'text',
  },
  {
    title: 'The Persistence Pilgrim',
    description:
      'The Persistence Pilgrim challenges your understanding of data storage in OpenEHR systems!',
    challenge:
      'Which statement best describes how data is typically stored in an OpenEHR system?',
    options: [
      'Data is stored in relational tables matching the structure of archetypes',
      'Each composition is stored as a single document in a NoSQL database',
      'Data is stored in a node + path + value format, preserving the hierarchical structure',
      'Archetypes themselves store the data values directly',
    ],
    correctAnswer: 2,
    explanation:
      'In many OpenEHR implementations, data is typically stored in a node + path + value format. This approach preserves the hierarchical structure defined by archetypes and templates, while allowing for efficient storage and querying of the data.',
    hint: 'Think about a storage method that would allow for flexible querying while maintaining the structure defined by archetypes.',
    language: 'text',
  },
  {
    title: 'The Querying Quest',
    description:
      'The Querying Quest tests your knowledge of data retrieval in OpenEHR systems!',
    challenge:
      'Which query language is specifically designed for use with OpenEHR systems?',
    options: [
      'SQL (Structured Query Language)',
      'AQL (Archetype Query Language)',
      'SPARQL (SPARQL Protocol and RDF Query Language)',
      'XQuery (XML Query Language)',
    ],
    correctAnswer: 1,
    explanation:
      'Archetype Query Language (AQL) is specifically designed for use with OpenEHR systems. It allows for querying of clinical data based on the archetype model, enabling powerful and flexible data retrieval across OpenEHR-based systems.',
    hint: 'Consider which query language would be tailored to the unique structure of OpenEHR data.',
    language: 'text',
  },
  {
    title: 'The Template Transformer',
    description:
      'The Template Transformer challenges you to understand the relationship between archetypes and templates!',
    challenge: 'How do templates differ from archetypes in OpenEHR?',
    options: [
      'Templates are used to create archetypes',
      'Templates combine and constrain archetypes for specific use cases',
      'Templates and archetypes are interchangeable terms',
      'Templates define the basic clinical concepts, while archetypes specialize them',
    ],
    correctAnswer: 1,
    explanation:
      'In OpenEHR, templates are used to combine and constrain archetypes for specific use cases. They allow for the creation of purpose-specific data structures by selecting relevant parts of archetypes and applying additional constraints.',
    hint: 'Think about how you might need to adapt general clinical concepts for specific scenarios or forms.',
    language: 'text',
  },
  {
    title: 'The Demographic Detective',
    description:
      'The Demographic Detective challenges you to understand how patient information is structured in OpenEHR!',
    challenge:
      'Which of the following is true about demographic information in OpenEHR?',
    options: [
      'Demographic data is stored directly in compositions',
      'OpenEHR uses a separate demographic model',
      'Demographic data is always part of the EHR',
      "OpenEHR doesn't support storing demographic information",
    ],
    correctAnswer: 1,
    explanation:
      'OpenEHR uses a separate demographic model to manage patient, practitioner, and organization information. This separation allows for more flexible and privacy-conscious handling of demographic data.',
    hint: 'Consider how separating certain types of data might benefit data management and privacy.',
    language: 'text',
  },
  {
    title: 'The Terminology Tamer',
    description:
      'The Terminology Tamer tests your knowledge of integrating external terminologies with OpenEHR!',
    challenge:
      'How does OpenEHR integrate with external terminology systems like SNOMED CT?',
    options: [
      "It doesn't - OpenEHR uses its own terminology exclusively",
      'External terminologies replace OpenEHR archetypes',
      'Through terminology bindings in archetypes and templates',
      'By converting all external terms into OpenEHR-specific codes',
    ],
    correctAnswer: 2,
    explanation:
      'OpenEHR integrates with external terminology systems like SNOMED CT through terminology bindings in archetypes and templates. This allows for the use of standardized codes and terms within the OpenEHR structure.',
    hint: 'Think about how OpenEHR might maintain its structure while still leveraging standardized medical terminologies.',
    language: 'text',
  },
  {
    title: 'The Interoperability Innovator',
    description:
      'The Interoperability Innovator challenges you to think about how OpenEHR facilitates data exchange between different systems!',
    challenge:
      'Which feature of OpenEHR primarily contributes to its interoperability capabilities?',
    options: [
      'Its use of a proprietary data format',
      'The separation of information models from clinical models',
      'Its reliance on a single, universal database system',
      'The requirement for all systems to use the same software',
    ],
    correctAnswer: 1,
    explanation:
      "OpenEHR's separation of information models (reference model) from clinical models (archetypes and templates) is a key feature that contributes to its interoperability. This separation allows for shared understanding of clinical concepts across different systems and contexts.",
    hint: 'Consider how separating different aspects of the model might allow for flexibility and shared understanding.',
    language: 'text',
  },
  {
    title: 'The Composition Conjurer',
    description:
      "You've made it to the Composition Conjurer's lair! Your task is to craft a composition that will impress the Conjurer.",
    challenge:
      "Create a composition for a patient's body temperature. The archetype ID is 'openEHR-EHR-OBSERVATION.body_temperature.v2'. The temperature is 37.5°C.",
    options: [
      `{
  "composition": {
    "content": [
      {
        "observation": {
          "archetype_id": "openEHR-EHR-OBSERVATION.body_temperature.v2",
          "data": {
            "events": [
              {
                "data": {
                  "items": [
                    {
                      "value": {
                        "magnitude": 37.5,
                        "units": "°C"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }
}`,
      `{
  "patient": {
    "vitals": {
      "temperature": 37.5,
      "unit": "celsius"
    }
  }
}`,
      `{
  "openEHR": {
    "body_temperature": {
      "value": 37.5,
      "unit": "C"
    }
  }
}`,
      `{
  "composition": {
    "archetype": "openEHR-EHR-OBSERVATION.body_temperature.v2",
    "temperature": "37.5°C"
  }
}`,
    ],
    correctAnswer: 0,
    explanation:
      'The correct composition follows the OpenEHR structure, including the proper archetype ID, and nests the temperature value within the expected data structure.',
    hint: 'Consider the hierarchical structure of OpenEHR compositions and how data is typically represented.',
    language: 'text',
  },
  {
    title: 'The AQL Alchemist',
    description:
      'Enter the laboratory of the AQL Alchemist, where queries are brewed to extract the essence of clinical data!',
    challenge:
      "Which AQL query will retrieve all blood pressure measurements for a specific patient with EHR ID 'abc123'?",
    options: [
      "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude AS systolic, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude AS diastolic FROM EHR e CONTAINS COMPOSITION c CONTAINS OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE e/ehr_id/value='abc123'",
      "SELECT * FROM EHR WHERE patient_id = 'abc123' AND observation_type = 'blood_pressure'",
      "GET blood_pressure FROM patient WHERE id = 'abc123'",
      "FIND 'blood pressure' IN EHR 'abc123'",
    ],
    correctAnswer: 0,
    explanation:
      'This AQL query correctly navigates the openEHR structure to retrieve systolic and diastolic blood pressure values from the specific archetype, filtering for the given EHR ID.',
    hint: 'AQL uses a structure similar to SQL, but with paths that navigate the openEHR data model.',
    language: 'text',
  },
  {
    title: 'The Template Tactician',
    description:
      'The Template Tactician challenges you to apply advanced template concepts in a real-world scenario!',
    challenge:
      'A hospital needs to create a discharge summary template that includes vital signs, medication list, and follow-up instructions. Which approach best utilizes OpenEHR principles?',
    options: [
      'Create a new archetype that combines all the required elements',
      'Use a template to constrain and combine existing archetypes for each section',
      'Directly store the discharge summary data in the EHR without using archetypes or templates',
      'Create separate templates for each section and link them in the EHR',
    ],
    correctAnswer: 1,
    explanation:
      'The best approach is to use a template to constrain and combine existing archetypes. This allows reuse of established archetypes for vital signs, medications, and instructions, while tailoring them to the specific needs of a discharge summary. It maintains consistency and interoperability while meeting the specific use case.',
    hint: 'Think about how templates and archetypes work together, and the principle of reusing and constraining existing models.',
    language: 'text',
  },
  {
    title: 'The Archetype Architect',
    description:
      'The Archetype Architect tests your understanding of archetype design principles and best practices!',
    challenge:
      "You need to design an archetype for recording a patient's smoking history. Which of the following approaches is most aligned with OpenEHR best practices?",
    options: [
      'Create a single, comprehensive archetype that covers all possible smoking-related data points',
      'Design multiple, highly specific archetypes for each aspect of smoking history',
      "Use an existing generic 'lifestyle factor' archetype and constrain it for smoking",
      'Create a moderate-sized archetype focusing on key smoking history elements, with the ability to extend or specialize later',
    ],
    correctAnswer: 3,
    explanation:
      'The best approach is to create a moderate-sized archetype focusing on key smoking history elements, with the ability to extend or specialize later. This balances the need for specific smoking-related data capture with the OpenEHR principles of reusability and maintainability. It allows for future refinement without overcomplicating the initial design.',
    hint: 'Consider the balance between specificity and reusability in archetype design, as well as the potential for future extensions.',
    language: 'text',
  },
  {
    title: 'The Versioning Virtuoso',
    description:
      'The Versioning Virtuoso challenges your understanding of change management in OpenEHR systems!',
    challenge:
      'A critical error is discovered in a widely-used medication archetype. What is the appropriate way to handle this in an OpenEHR system?',
    options: [
      'Immediately replace the archetype with a corrected version in all systems',
      'Create a new version of the archetype, deprecate the old one, and update systems gradually',
      'Leave the archetype as-is and instruct users to be aware of the error',
      'Create a completely new archetype with a different ID to replace the erroneous one',
    ],
    correctAnswer: 1,
    explanation:
      "The appropriate approach is to create a new version of the archetype, deprecate the old one, and update systems gradually. This maintains backward compatibility for existing data while allowing systems to adopt the corrected version. It follows OpenEHR's principles of versioning and change management.",
    hint: 'Think about how to balance the need for correction with the reality of existing data and systems using the current version.',
    language: 'text',
  },
  {
    title: 'The Semantic Sage',
    description:
      'The Semantic Sage tests your ability to ensure semantic interoperability in OpenEHR implementations!',
    challenge:
      "You're integrating two OpenEHR systems that use different terminology bindings for medication names. What's the best approach to ensure semantic interoperability?",
    options: [
      'Force one system to adopt the terminology bindings of the other',
      'Create a mapping table between the two terminologies and translate during data exchange',
      "Use OpenEHR's terminology binding features to map both to a common standard terminology",
      'Store medication names as free text to avoid terminology conflicts',
    ],
    correctAnswer: 2,
    explanation:
      "The best approach is to use OpenEHR's terminology binding features to map both systems to a common standard terminology. This preserves the local terminologies while ensuring semantic interoperability through a shared standard. It leverages OpenEHR's design for handling diverse terminologies.",
    hint: 'Consider how OpenEHR is designed to handle terminology differences while maintaining semantic meaning across systems.',
    language: 'text',
  },
  {
    title: 'The Standardization Sage',
    description:
      "The Standardization Sage challenges your understanding of OpenEHR's role in health data standardization!",
    challenge:
      'How does OpenEHR contribute to the standardization of health data?',
    options: [
      'By enforcing a single, universal data format for all health records',
      'Through its two-level modeling approach and shared archetype definitions',
      'By requiring all healthcare providers to use the same software',
      'Through government-mandated data structures',
    ],
    correctAnswer: 1,
    explanation:
      'OpenEHR contributes to health data standardization through its two-level modeling approach and shared archetype definitions. This allows for a common understanding of clinical concepts while maintaining flexibility for local needs, promoting semantic interoperability across different healthcare systems.',
    hint: 'Think about how OpenEHR balances standardization with flexibility in its approach to modeling clinical data.',
    language: 'text',
  },
  {
    title: 'The Governance Guru',
    description:
      'The Governance Guru challenges you to apply OpenEHR principles to data governance and privacy scenarios!',
    challenge:
      'A multi-national research project wants to use OpenEHR for data collection across different countries with varying data protection laws. What approach best addresses this challenge?',
    options: [
      'Use a single, standardized OpenEHR template for all countries, ignoring local law variations',
      'Create separate, country-specific OpenEHR implementations for each participating nation',
      "Use OpenEHR's archetype and template mechanism to create a core dataset, with country-specific extensions to meet local requirements",
      'Avoid using OpenEHR and opt for a custom, project-specific data model instead',
    ],
    correctAnswer: 2,
    explanation:
      "The best approach is to use OpenEHR's archetype and template mechanism to create a core dataset, with country-specific extensions to meet local requirements. This allows for a standardized base of data collection while providing the flexibility to adhere to varying local data protection laws. It leverages OpenEHR's design for balancing standardization with localization.",
    hint: "Think about how OpenEHR's architecture can allow for both standardization and customization to meet diverse requirements.",
    language: 'text',
  },
  {
    title: 'The Query Quandary',
    description:
      'The Query Quandary tests your ability to construct complex AQL queries for real-world scenarios!',
    challenge:
      'Which AQL query would correctly retrieve the latest blood pressure readings for all patients diagnosed with hypertension in the last year?',
    options: [
      'SELECT e/ehr_id/value, o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude AS systolic, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude AS diastolic FROM EHR e CONTAINS COMPOSITION c CONTAINS OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE c/context/start_time > current_date - P1Y ORDER BY c/context/start_time DESC',
      "SELECT e/ehr_id/value as ehr_id, p/data[at0001]/items[at0002]/value AS diagnosis, o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value AS systolic, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value AS diastolic FROM EHR e CONTAINS COMPOSITION c CONTAINS (OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1] and EVALUATION p[openEHR-EHR-EVALUATION.problem_diagnosis.v1]) WHERE c/context/start_time > current_date - P1Y AND p/data[at0001]/items[at0002]/value/defining_code/code_string = 'I10' ORDER BY c/context/start_time DESC",
      "SELECT * FROM EHR WHERE diagnosis = 'hypertension' AND diagnosis_date > current_date - 365 ORDER BY observation_date DESC LIMIT 1",
      "GET latest_blood_pressure FROM patients WHERE diagnosis = 'hypertension' AND diagnosis_date > now() - interval '1 year'",
    ],
    correctAnswer: 1,
    explanation:
      "This AQL query correctly addresses all aspects of the requirement. It retrieves the EHR ID, diagnosis, and blood pressure readings (systolic and diastolic). It combines the blood pressure OBSERVATION with the problem_diagnosis EVALUATION to filter for hypertension. The query filters for compositions from the last year, specifically selects for hypertension diagnosis (using the ICD-10 code 'I10' for essential hypertension), and orders the results by date to get the latest readings. This demonstrates the need to often combine different archetypes (in this case, observations and evaluations) to get clinically meaningful results in real-world scenarios.",
    hint: 'Consider how you would need to combine blood pressure readings with diagnosis information, and how to filter for both the time range and the specific diagnosis.',
    language: 'text',
  },
];
