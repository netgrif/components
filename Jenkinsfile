pipeline {
  agent any
  environment {
        NEXUS_CRED = credentials('1986c778-eba7-44d7-b6f6-71e73906d894')
  }
  tools {
    nodejs 'localNodeJS'
  }
  stages {

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit Test') {
          steps {
            sh 'sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget'
            sh 'npm run ng test netgrif-application-engine'
          }
        }

        stage('Lint') {
          steps {
            sh 'npm run ng lint netgrif-application-engine'
          }
        }

        stage('Sonar') {
            steps {
                echo 'Sonar'

            }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run nae:build'
      }
    }

    stage('Doc') {
      steps {
        sh 'npm run nae:doc'
      }
    }

    stage('Publish') {
          steps {
            sh 'mv .npmrc .npmrc_renamed'
            sh 'echo "registry=https://nexus.netgrif.com/repository/npm-private/" > .npmrc'
            sh 'echo "email=jenkins@netgrif.com" >> .npmrc'
            sh 'echo -n "_auth=" >> .npmrc'
            sh 'echo -n $NEXUS_CRED | openssl base64 >> .npmrc'
            sh 'cat .npmrc'
            sh 'npm publish dist/netgrif-application-engine'
            sh 'rm .npmrc'
            sh 'mv .npmrc_renamed .npmrc'
          }
     }

  }

  post {
    always {
      junit testResults: '**/coverage/netgrif-application-engine/**/JUNITX-test-report.xml',
        allowEmptyResults: false,
        healthScaleFactor: 1.0
      archiveArtifacts artifacts: './dist/netgrif-application-engine/nae-build.zip', fingerprint: true
    }
  }
}
